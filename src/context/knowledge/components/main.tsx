import { Card } from "./card"
import { DataList } from "./data-list"
import { Filtering } from "./filtering"

export const Knowledge = {
    Filtering: Filtering,
    DataList: DataList,
    Card: Card
}

export function KnowledgeComponent() {
    return (
        <main className="flex flex-col mt-4 gap-4">
            <Knowledge.Filtering />
            <Knowledge.DataList />
        </main>
    )
}