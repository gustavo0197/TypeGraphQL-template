var expect = require("chai").expect
var url = "http://localhost:7000/graphql" // default port
var request = require('supertest')(url)

describe("Hello resolver testing", () => {
    it("Hello resolver", async () => { // you can use async/await
        try {
            var {body} = await request.post("") // Make a request
            .send({
                query: `
                    {
                        Hello { message isWorking }
                    }
                `
            })
        } catch (error) {}
        console.log(body.data.Hello)
        expect(body.data.Hello.isWorking).to.equal(true)
    })
})