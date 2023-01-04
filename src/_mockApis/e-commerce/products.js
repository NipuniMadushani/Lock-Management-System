// project imports
import services from 'utils/mockAdapter';

// third-party
import { add, sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

// products list
const products = [
    {
        id: 1,
        image: 'prod-1.png',
        name: 'Door Access Control Board Panel Controller For 2 Doors Wiegand 4 Readers TCP/IP WAN Access Control system',
        description:
            'Multi-Card Open Door: Yes open long time at specific time: Yes ,Door opening time extension: Setting: 1 ~ 600 seconds (adjustable) ',
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 25,
        salePrice: 350,
        offerPrice: 275,
        gender: 'male',
        categories: ['fashion', 'books'],
        // colors: ['errorDark', 'orangeDark', 'errorMain', 'secondaryMain'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true
    },
    {
        id: 2,
        image: 'prod-2.png',
        name: 'Keyboard Access Control With MF Card Reader Mobile BLT TT Lock Access Control Waterproof IP68 Card Reader With Keyboard',
        description:
            'The device is a standalone access control and proximity card reader which supports MF card type. It builds-in STC microprocessor, with strong anti-interference ability,high security and reliability,powerful function and convenient operation It’s widely used in high-end buildings, residential communities and other public places',
        discount: 10,
        salePrice: 89.99,
        offerPrice: 81.99,
        gender: 'kids',
        categories: ['fashion', 'toys'],
        colors: ['primary200', 'successLight', 'secondary200', 'warningMain'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
        isStock: false
    },
    {
        id: 3,
        image: 'prod-3.png',
        name: '60/180/280/350KG Good Quality Embedded Buried Magnetic Lock Electric Lock Door Access Control System EM Lock',
        description:
            '100% brand new and high quality 2. Secure mode: Locked when power on, unlocked when power off 3. Especially suitable for wooden/ glass/ metal/ secuirty doors.4. It is made from durable and high stainless steel material, durable for use',
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 40,
        salePrice: 85.0,
        offerPrice: 49.9,
        gender: 'male',
        categories: ['fashion', 'electronics'],
        colors: ['primary200', 'primaryDark'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 4, hours: 9, minutes: 50 }),
        isStock: true
    },
    {
        id: 4,
        image: 'prod-4.png',
        name: 'IP65 Waterproof Visible Face Access Control With Fingerprint Reader Or QR Code EM And MF Card Reader Face Time Attendance',
        description:
            ' Uface 5 Pro series is an AI-based face recognition allin-one terminal featuring high reliability and high performance, which can be applied to deliver a highspeed recognition rate with unrivaled accuracy.  Powered by the latest deep-learning ',
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 17,
        salePrice: 36.0,
        offerPrice: 29.99,
        gender: 'kids',
        categories: ['fashion', 'electronics', 'toys'],
        colors: ['errorLight', 'orangeMain', 'warningMain'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 7, hours: 6, minutes: 45 }),
        isStock: false
    },
    {
        id: 5,
        image: 'prod-5.png',
        name: 'Smart Home Automatic Swing Door Opener Closer Electric Garage Gate Operator Optional Sensor Remote Control Big Gate Motor',
        description: 'Automatoc door opener is low enerhy automatic with a swing door opener that is activated by push buttons',
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 20,
        salePrice: 15.99,
        offerPrice: 12.99,
        gender: 'male',
        categories: ['books'],
        colors: ['warningMain', 'primary200'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
        isStock: true
    },
    {
        id: 6,
        image: 'prod-6.png',
        name: 'WIFI TUYA Biometric Fingerprint Facial Face Recognition Palm Print Card Password Key Smart Front Door Lock Access Control System',
        description:
            'Waterproof level: slightly waterproof, completely open air environment such as direct rain cannot be accepted Lock body size: 24*240/30*240/other anti-theft door lock body size, default 24*240MM lock body size is sent, large lock',
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 13,
        salePrice: 99.99,
        offerPrice: 86.99,
        gender: 'female',
        categories: ['fashion', 'kitchen'],
        colors: ['primaryDark', 'orangeDark'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: add(new Date(), { days: 6, hours: 10, minutes: 0 }),
        isStock: true
    },
    {
        id: 7,
        image: 'prod-7.png',
        name: 'IP68 Waterproof Door Access Control Exit Button Zinc Alloy No Touch Door Release Metal Touchless Exit Button',
        description: 'Sensitive Distance 5-20cm（Adjustable）,Material Zinc Alloy,Operating Temp -20℃~+55℃(14-131F)',
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 15,
        salePrice: 16.99,
        offerPrice: 14.59,
        gender: 'male',
        categories: ['fashion'],
        colors: ['errorDark', 'secondaryMain', 'errorMain', 'orangeDark'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: add(new Date(), { days: 14, hours: 1, minutes: 55 }),
        isStock: false
    },
    {
        id: 8,
        image: 'prod-8.png',
        name: 'Infrared Sensor Switch No Touch Contactless Switches Door Release Exit Button with LED Indication 304 Stainless Steel',
        description:
            "The biometric access control features 5-inch TFT capacitive color touchscreen, dual infrared, dual high-definition cameras, and Dual-core ARM Cortex-A7@ 900MHz. Using XIMI's new real-time facial recognition algorithm, face capture is more accurate and faster through light balancing. After years of improvement, our products are more cost-effective as ever. They are widely used in government agencies, intelligent buildings, office buildings, high-end residential property, universities, enterprises, and much more.",
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 20,
        salePrice: 129.99,
        offerPrice: 100.0,
        gender: 'female',
        categories: ['toys'],
        colors: ['darkMain', 'errorMain', 'successDark'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 0, hours: 11, minutes: 10 }),
        isStock: true
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/products/list').reply(200, { products });

services.onPost('/api/products/filter').reply((config) => {
    try {
        const { filter } = JSON.parse(config.data);

        if (filter.sort === 'high') {
            products.sort((a, b) => Number(b.offerPrice) - Number(a.offerPrice));
        }

        if (filter.sort === 'low') {
            products.sort((a, b) => Number(a.offerPrice) - Number(b.offerPrice));
        }

        if (filter.sort === 'popularity') {
            products.sort((a, b) => Number(b.popularity) - Number(a.popularity));
        }

        if (filter.sort === 'discount') {
            products.sort((a, b) => Number(b.discount) - Number(a.discount));
        }

        if (filter.sort === 'discount') {
            products.sort((a, b) => Number(b.discount) - Number(a.discount));
        }

        if (filter.sort === 'new') {
            products.sort((a, b) => Number(b.new) - Number(a.new));
        }

        const results = products.filter((product) => {
            let searchMatches = true;

            if (filter.search) {
                const properties = ['name', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (product[property].toString().toLowerCase().includes(filter.search.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    searchMatches = false;
                }
            }

            const genderMatches = filter.gender.length > 0 ? filter.gender.some((item) => item === product.gender) : true;
            const categoriesMatches =
                filter.categories.length > 0 && filter.categories.some((category) => category !== 'all')
                    ? filter.categories.some((category) => product.categories.some((item) => item === category))
                    : true;
            const colorsMatches =
                filter.colors.length > 0 ? filter.colors.some((color) => product.colors.some((item) => item === color)) : true;

            const minMax = filter.price ? filter.price.split('-') : '';
            const priceMatches = filter.price ? product.offerPrice >= minMax[0] && product.offerPrice <= minMax[1] : true;
            const ratingMatches = filter.rating > 0 ? product.rating >= filter.rating : true;

            return searchMatches && genderMatches && categoriesMatches && colorsMatches && priceMatches && ratingMatches;
        });

        return [200, results];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/product/details').reply((config) => {
    try {
        const { id } = JSON.parse(config.data);

        let results;
        if (id === 'default') {
            [results] = products;
        } else {
            [results] = products.filter((product) => product.id === Number(id));
        }

        return [200, results];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/product/related').reply((config) => {
    try {
        const { id } = JSON.parse(config.data);

        const results = products.filter((product) => product.id !== Number(id));

        return [200, results];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});
