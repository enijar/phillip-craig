import {asset} from "../utils";

export default function ProductFactory(total = 1) {
    const entities = [];

    for (let i = 0; i < total; i++) {
        const name = 'Bubblegum Block Hoodie';
        const slug = name.replace(/\s+/, '-');

        entities.push({
            id: i + 1,
            img: asset('img/items/0.png'),
            name,
            slug,
            price: 5500,
        });
    }

    return entities;
}
