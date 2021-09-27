import { CallCredentials, Metadata } from "@grpc/grpc-js";
import { CallMetadataOptions } from "@grpc/grpc-js/build/src/call-credentials";
import nock from "nock";
import {TableBasedCallCredentials} from "./auth";
const MOCK_SERVICE_ENDPOINT = "http://localhost:8081/v1/auth"

describe("TableBasedCallCredentials", () => {
    describe("generateMetadata", () => {
        describe("default scenario - only one metadata generator", () => {
            describe("successfully received response from service endpoint", () => {
                it("returns a Metadata object with the auth token value inside", async () => {
                    const credentials = new TableBasedCallCredentials('foo', 'bar');

                    const scope = nock(MOCK_SERVICE_ENDPOINT)
                        .post('')
                        .reply(200, {authToken: 'xyz'})
                    
                    const metadata = await credentials.generateMetadata({service_url: MOCK_SERVICE_ENDPOINT});
                    expect(metadata.get('x-cassandra-token')[0]).toBe('xyz')
                })
            })
            describe("error calling service endpoint", () => {
                it("throws an error", async () => {
                    const credentials = new TableBasedCallCredentials('foo', 'bar');

                    nock(MOCK_SERVICE_ENDPOINT)
                        .post('')
                        .replyWithError('something broke');

                    await expect(credentials.generateMetadata({service_url: MOCK_SERVICE_ENDPOINT}))
                    .rejects
                    .toThrow();
                })
            })
        });
        describe("post-compose - multiple metadata generators", () => {
            it("returns a Metadata object with metadata from all generators", async () => {
                const credentials = new TableBasedCallCredentials('foo', 'bar').compose(new DummyCallCredentials);

                const scope = nock(MOCK_SERVICE_ENDPOINT)
                    .post('')
                    .reply(200, {authToken: 'xyz'})
                
                const metadata = await credentials.generateMetadata({service_url: MOCK_SERVICE_ENDPOINT});
                expect(metadata.get('x-cassandra-token')[0]).toBe('xyz');
                expect(metadata.get('abc')[0]).toBe('xyz')
            })
        })
    })
    describe("compose", () => {
        it("returns a brand-new CallCredentials object", () => {
            const credentials = new TableBasedCallCredentials('foo', 'bar');
            const dummyCredentials = new DummyCallCredentials();

            const composedCredentials = credentials.compose(dummyCredentials);

            expect(composedCredentials === credentials).toBe(false);
        })
    })
    describe("_equals", () => {
        describe("called with the same object", () => {
            it("returns true", () => {
                const credentials = new TableBasedCallCredentials('foo', 'bar');
                const result = credentials._equals(credentials);
                expect(result).toBe(true);
            })
        })
        describe("called with another object", () => {
            describe("other object is not an instance of TableBasedCallCredentials", () => {
                it("returns false", () => {
                    const tableBased = new TableBasedCallCredentials('foo', 'bar');
                    const dummy = new DummyCallCredentials();
                    const result = tableBased._equals(dummy);
                    expect(result).toBe(false);
                })
            });
            describe("other object is an instance of TableBasedCallCredentials", () => {
                describe("username and password are the same", () => {
                    it("returns true", () => {
                        const a = new TableBasedCallCredentials('foo', 'bar');
                        const b = new TableBasedCallCredentials('foo','bar');
                        const result = a._equals(b);
                        expect(result).toBe(true);
                    })
                })
                describe("username equal, password different", ()=> {
                    it("returns false", () => {
                        const a = new TableBasedCallCredentials('foo', 'bar');
                        const b = new TableBasedCallCredentials('foo','baz');
                        const result = a._equals(b);
                        expect(result).toBe(false);
                    })
                })
                describe("username different, password equal", () => {
                    const a = new TableBasedCallCredentials('fooo', 'bar');
                    const b = new TableBasedCallCredentials('foo','bar');
                    const result = a._equals(b);
                    expect(result).toBe(false);
                })
            })
        })
    })
})

class DummyCallCredentials extends CallCredentials {

    generateMetadata(options: CallMetadataOptions): Promise<Metadata> {
        return new Promise((resolve, _) => {
            const metadata = new Metadata();
            metadata.set('abc', 'xyz');
            return resolve(metadata);
        }) 
    }

    compose(callCredentials: CallCredentials): CallCredentials {
        return this;
    }

    _equals(other: CallCredentials): boolean {
        return true;
    }
}