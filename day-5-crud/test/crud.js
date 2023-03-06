const Crud = artifacts.require('Crud');

contract ('Crud', () => {
    let crud = null;
    before(async () => {
        crud = await Crud.deployed();
    });
    it('should add a new user', async () => {
        await crud.create('Andrew');
        const user = await crud.read(1);
        // the struct will be stored as an array in javascript
        // the first element of the array is a uint that we have to convert from Big Number
        assert(user[0].toNumber() == 1);
        assert(user[1] == 'Andrew')
    });

    it('should update an existing user', async () => {
        await crud.update(1, 'Chris')
        const user = await crud.read(1);
        // the struct will be stored as an array in javascript
        // the first element of the array is a uint that we have to convert from Big Number
        assert(user[0].toNumber() == 1);
        assert(user[1] == 'Chris')
    });

    it('should not update a non-existant user', async () => {
        try{    
            await crud.update(3, 'Chris')
        } catch(e) {
            assert(e.message.includes('user does not exist!'));
            return;
        }
        assert(false);
    });

    it('should delete an existing user', async () => {
        await crud.destroy(1);
        try{ 
            await crud.read(1); 
        } catch (e) {
            assert(e.message.includes('user does not exist!'));
            return;
        }
        assert(false);
    })

    it('should NOT delete an existing user', async () => {
        try{ 
            await crud.destroy(2);
        } catch (e) {
            assert(e.message.includes('user does not exist!'));
            return;
        }
        assert(false);
    })


});
