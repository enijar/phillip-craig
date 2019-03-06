import get from "lodash/get";
import {asset, guid} from "../utils";

export default attributes => {
    const name = get(attributes, 'name', 'Bubblegum Block Hoodie');
    const slug = name.replace(/\s+/, '-');

    return {
        id: guid(),
        img: asset('img/items/0.png'),
        name,
        slug,
        price: get(attributes, 'price', 5500),
    };
}
