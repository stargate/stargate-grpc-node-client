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
                    scope.done()
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
        })
    })
    describe("compose", () => {

    })
})