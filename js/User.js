class User {
    constructor(id, email, username, password, firstname, lastname, phone, address) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = {
            firstname: firstname,
            lastname: lastname
        };
        this.address = address;
        this.phone = phone;
    }
}

class Address {
    constructor(city, street, number, zipcode, geolocation) {
        this.city = city;
        this.street = street;
        this.number = number;
        this.zipcode = zipcode;
        this.geolocation = geolocation;
    }
}

class Geolocation {
    constructor() {
        this.lat = 0,
            this.long = 0
    }
}