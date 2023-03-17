const roles = {
    admin: "admin",
    basic: "basic"
}

const users = [
    {name:"Kwasi", id:1, role: "admin"},
    {name:"koo", id:4, role: "admin"},
    {name:"Pete", id:2, role: "basic"},
    {name:"They", id:3, role: "basic"},
]

const emails = [
    {name:"Kwasi email", id:1, userId: 1},
    {name:"koo email", id:4, userId: 2},
    {name:"Pete email", id:2, userId: 3},
    {name:"They email", id:3, userId: 4},
]
    
module.exports = {
    roles,
    users,
    emails
}