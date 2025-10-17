/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, User } from "lucide-react";

export function CommentsComponent() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <MessageSquare size={20} className="text-gray-500" />
                <span className=" text-gray-700 font-semibold">Comentários (0)</span>
            </div>
            <Card className="py-3 gap-4 shadow">
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 items-end">
                        <div className="flex items-start justify-end gap-4 w-full">
                            <Avatar>
                                <AvatarImage src="https://avatars.githubusercontent.com/u/68699314?v=4" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Textarea
                                className="bg-gray-50 w-full"
                                placeholder="Adicione um comentário..."
                            />
                        </div>
                        <Button className="bg-sky-500 hover:bg-sky-600 flex w-30">Publicar</Button>
                    </div>
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <Avatar>
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/68699314?v=4" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-800 font-semibold">Ana Silva</span>
                                    <span className="text-sm text-gray-600">Funcionou para mim! Tive que limpar o cache e os cookies. Obrigado pela dica!Funcionou para mim! Tive que limpar o cache e os cookies. Obrigado pela dica!</span>
                                </div>
                            </div>
                            <div className="min-w-30">
                                <span className="text-[0.8rem] text-gray-600">2 horas atrás</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}