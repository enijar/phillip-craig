import {asset} from "../utils";

export default function ProductFactory(total = 1) {
    const entities = [];

    for (let i = 0; i < total; i++) {
        const name = 'Bubblegum Block Hoodie';
        const slug = name.replace(/\s+/g, '-');

        entities.push({
            id: i + 1,
            img: asset('img/items/0.png'),
            preview: asset('img/previews/0.png'),
            name,
            slug,
            price: 5500,
            description: `
                Lorem ipsum dolor sit amet, co sectetur adipiscing elit, 
                sed do eiusmod tempor incidi ut labore et dolore magna aliqua. 
                Quis ipsum supendisse. ultrices grav. Risus commodo viverra 
                maecenas accumsan lacus vel facilisis.
            `,
            size: 'M',
            quantity: 1,
        });
    }

    return total === 1 ? entities[0] : entities;
}
