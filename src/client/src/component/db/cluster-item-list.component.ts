import { CardItemComponent } from "./card-item.component";

type RecentItems = {
    type?: string;
    cluster?: string;
    shard?: string;
    database?: string;
};

export class ClusterItemListComponent extends HTMLDivElement {
    listEl: HTMLDivElement;

    items: CardItemComponent[] = [];

    constructor() {
        super();

        // Parents
        const parent_el = this.parentNode;
        const shadow_el = this.attachShadow({ mode: "open" });

        // Attributes
        const api_at = this.getAttribute("api");

        // Elements
        const list_el = document.createElement("div");
        list_el.style.display = "flex";
        list_el.style.gap = "16px";
        this.listEl = list_el;

        // Append
        shadow_el.appendChild(list_el);

        // Init
        const data: RecentItems[] = [];

        this.renderCardItem(data);
    }

    renderCardItem(input: RecentItems[]) {
        const cardItems: CardItemComponent[] = [];
        for (const item of input) {
            const cardItem = CardItemComponent.renderItem(item);
            this.items.push(cardItem);
            this.listEl.appendChild(cardItem);
        }

        if (input.length == 0) {
            const addItem = CardItemComponent.renderItem({ type: "add" });
            this.listEl.appendChild(addItem);
        }
    }
}

// Define the new element
customElements.define("d-cluster-item-list", ClusterItemListComponent, {
    extends: "div",
});
