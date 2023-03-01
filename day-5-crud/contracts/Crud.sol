pragma solidity ^0.5.0;

contract Crud {
    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint public nextId;

    function create(string memory name) public {
        // this function will input the next id available and the entered name and push to the users array
        users.push(User(nextId, name));
        // iterating nextId to prevent existing id's from getting overwritten
        nextId++;
    }

    function read(uint id) view public returns(uint, string memory) {
        //using a for loop to iterate through the users array
        for(uint i = 0; i < users.length; i++) {
            // we want to validate that the id value of the element in the array matches to the one that was entered
            if(users[i].id == id) {
                return (users[i].id, users[i].name);
            }
        }
    }

    function update(uint id, string memory name) public {
        for (uint i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                users[i].name = name;
            }
        }
    }

    function destroy(uint id) public {
        delete users[id];
    }
}