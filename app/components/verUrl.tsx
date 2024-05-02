import React, { useState, useEffect } from "react";
const UrlContent: React.FC<{ url: string }> = ({ url }) => {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchUrlContent = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.text();
                    setContent(data);
                } else {
                    console.error("Error al obtener el contenido de la URL:", response.statusText);
                }
            } catch (error: any) {
                console.error("Error al obtener el contenido de la URL:", error.message);
            }
        };

        fetchUrlContent();
        return () => setContent(null);
    }, [url]);

    return (
        <div>
            <h2>Contenido de la URL:</h2>
            <pre>{content}</pre>
        </div>
    );
};

export default UrlContent;
