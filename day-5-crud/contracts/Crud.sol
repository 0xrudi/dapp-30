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
        // uses the helper function to locate the record to update
        i = find(id); 
        return (users[i].id, users[i].name);
    }

    function update(uint id, string memory name) public {
        // uses the helper function to locate the record to update
        i = find(id);
        // uses dot function to update the name for the specific record
        return(users[i].name = name);
        }
    }

    function destroy(uint id) public {
        // uses the helper function to locate the record to update
        i = find(id);
        delete users[i];
    }

    // below is a helper function to remove redundant code from public functions
    // this helper function will be internal since it only should be called by the smart contract
    // using a for loop to iterate through the users array
    function find(uint id) view internal returns {uint} {
        for (uint i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                return i;
            }
        }
    }
}
