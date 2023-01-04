// project imports
import services from 'utils/mockAdapter';

// third-party
import { Chance } from 'chance';
import { v4 as UIDV4 } from 'uuid';

const chance = new Chance();

// billing address list
let address = [
    {
        id: 1,
        name: chance.name(),
        destination: 'home',
        building: 'Block-A',
        street: '59 Palawatha Street, 11',
        city: 'Matugama',
        state: 'Western',
        country: 'SriLanka',
        post: '12130',
        phone: '077-3056894',
        isDefault: true
    },
    {
        id: 2,
        name: chance.name(),
        destination: 'office',
        building: '24',
        street: ' C/O KOTUGODA TRANSPORT (PVT) LTD, KOTUGODA',
        city: 'Ekala',
        state: ' EKALA',
        country: 'Sri Lanka',
        post: chance.postcode(),
        phone: '034-2253066',
        isDefault: false
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/address/list').reply(200, { address });

services.onPost('/api/address/new').reply((request) => {
    try {
        const data = JSON.parse(request.data);
        const { name, destination, building, street, city, state, country, post, phone, isDefault } = data;
        const newAddress = {
            id: UIDV4(),
            name,
            destination,
            building,
            street,
            city,
            state,
            country,
            post,
            phone,
            isDefault
        };

        if (isDefault) {
            address = address.map((item) => {
                if (item.isDefault === true) {
                    return { ...item, isDefault: false };
                }
                return item;
            });
        }

        address = [...address, newAddress];

        return [200, { address }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/address/edit').reply((request) => {
    try {
        const data = JSON.parse(request.data);

        if (data.isDefault) {
            address = address.map((item) => {
                if (item.isDefault === true) {
                    return { ...item, isDefault: false };
                }
                return item;
            });
        }

        address = address.map((item) => {
            if (item.id === data.id) {
                return data;
            }
            return item;
        });

        return [200, { address }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});
