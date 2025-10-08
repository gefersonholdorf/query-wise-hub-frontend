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
        <main className="rounded-lg p-6 bg-white w-full flex flex-col gap-6 justify-between mt-2 shadow-[0_0_10px_5px_rgba(0,0,0,0.25)]">
            <Knowledge.Filtering />
            <Knowledge.DataList />
        </main>
    )
}