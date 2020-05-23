class GitHub {
    constructor() {
        this.clientID = "698ef61c96e417319d81"
        this.clientSecret = "1e863cb10c802b58536c3c655c04d98494392aac"
    }
    async getUser(user) {
        //Await until the data is resolved
        const response = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientID} &client_secret=${this.clientSecret}`)

        //Parse the response into JSON format
        const data = await response.json()

        return data
    }

    async getRepository(user) {
        // Await until the data is resolved
        const response = await fetch(`https://api.github.com/users/${user}/repos?client_id=${this.clientID} &client_secret=${this.clientSecret}`)

        //Parse the data into JSON
        const data = await response.json()

        return data
    }
}