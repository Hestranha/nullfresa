/* eslint-disable @next/next/no-img-element */
interface CardIGProps {
    usuario: string;
    foto?: string; // `foto` es opcional
    nombre?: string;
    descripcion?: string;
    privado?: boolean;
}

export function CardIG({ usuario, foto, nombre, descripcion, privado }: CardIGProps) {
    // Proporciona una imagen por defecto si `foto` es `undefined`
    const imageUrl = foto || 'https://via.placeholder.com/150'; // URL de una imagen por defecto

    return (
        <article className="relative w-full lg:w-[28rem] h-[7.5rem] items-center flex bg-neutral-900 p-3 rounded-md gap-3">
            <div className="max-lg:aspect-square lg:w-24 h-24">
                <img className="h-full w-full aspect-square object-cover rounded-md" src={imageUrl} alt={nombre} />
            </div>
            <span className={`absolute top-3 right-4 ${privado ? "text-[#ff8181]" : "text-[#96ff81]"}`}>{privado ? 'Privado' : 'Público'}</span>
            <div className="w-5/6 h-24">
                <div h-8>
                    <h2>{nombre}</h2>
                    <span>@{usuario}</span>
                </div>
                <div className="h-12 overflow-x-auto w-">
                    <p className="text-xs">
                        {descripcion}
                    </p>
                </div>
            </div>
        </article>
    );
}
