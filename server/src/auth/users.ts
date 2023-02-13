import { isTesting } from "../utils/environment";

interface UsersByEnvironment {
    testing: User[],
    production: User[],
};

export interface User {
    username: string,
    secret: string,
}

//Note: These are 256 bytes hashes of plain text passwords. Ideally should be stored in a database
const users: UsersByEnvironment = {
    testing: [
        {
            username: 'testing-user',
            secret: '415c2d1fa20f3de967e8321aa9f01f3ef9e17cf29eb0831ab9e8798e9cfc48d3' //testing-secret
        }
    ],
    production: [
        {
            username: 'santiago@latii.com',
            secret: 'e081f4b14df58b4469d080a5b23a2e7bd4d48443cc7eb4bce76e44fe11b568f6'
        },
        {
            username: 'camila@latii.trade',
            secret: '29e6dc62a9e0dc929d5a1daa288868f0a0e6291968b26da1891ab7f66ef30c66'
        },
        {
            username: 'm@carmor.org',
            secret: 'a42294f3063afc09026966a8483cbf96d1dcfd039771189d5f07043502c6012b'
        }
    ]
}

export default users[isTesting() ? "testing" : "production"];