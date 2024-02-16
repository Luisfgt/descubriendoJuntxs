'use client'
import "./modal.css"
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useState } from "react"
import { icons } from '../Icons/Icons';
import { useAuthContext } from "@/app/contexto/AuthContext";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useSocketContext } from "@/app/contexto/SocketContext";


interface ModalProjectProps {
    openModal: boolean;
    closeModal: () => void;
    project: {
        id: number,
        name: string,
        description: string,
        dateIn: string,
        dateOut: string,
        urlYoutube: string,
        objective: string,
        syllabus: string,
        state: string,
        categoryId: number,
        type: string,
        image: string,
        commentary: Comment[]
    },
    socket: any
}

type Comment = {
    userId: number,
    programId: number,
    commentary: string
}

const ModalProject: React.FC<ModalProjectProps> = ({ openModal, closeModal, project, socket }) => {
    const { name, description, image, objective, commentary, id } = project;
    const { infoUserGlobal } = useAuthContext()
    const [MostrarComentario, setMostrarComentario] = useState(false)
    const [newCommentary, setNewCommentary] = useState('')
    const [allCommentaries, setAllCommentaries] = useState(commentary)
    //importación del usuario con el auth context
    const parseInfo = JSON.parse(infoUserGlobal ?? '')
    //importación del socket con SocketContext
    const router = useRouter()
    socket.on('newCommentary', (newComment: Comment) => {
        setAllCommentaries([...allCommentaries, newComment])
    })
    socket.on('commentaryError', ({ error }: { error: any }) => {
        alert(error)
    })
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [])
    // tamaño de los comentarios
    let totalCommentaries = allCommentaries.length
    //Función para enviar comentarios con socket
    const sendMessage = () => {
        try {
            const data = {
                programId: id,
                userId: parseInfo.id,
                commentary: newCommentary
            }
            socket.emit('commentary', data)
            setNewCommentary('')

        } catch (error) {
            alert(error);
        }
    }
    //Función que captura la info del text área del comentario
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewCommentary(event.target.value)
    }
    if (!openModal) return null
    return (
        <>
            <div className="padreProyect">
                <div className="proyectLetra">
                    <div className="proyectDetailImage">
                        <img className="imageProject" src={image} alt="" />
                    </div>
                    <div className="infoTotalComplete">
                        <div className="closeModal">
                            <button
                                className="closeModalTransition"
                                onClick={() => {
                                    closeModal()
                                    // location.reload()
                                    router.refresh()
                                }}>
                                <img src={icons.close.src} alt="" />
                            </button>
                        </div>
                        <div className="infoContainerDetail">
                            <div className="proyectDescRating">
                                <button className="verMasInfo" onClick={() => setMostrarComentario(!MostrarComentario)}>
                                    {MostrarComentario ? "Ocultar Comentarios" : <div className="flex gap-2" style={{ color: '#7286FF' }}>
                                        Ver Comentarios
                                        <img style={{ width: '1.5rem' }} src={icons.chat.src} alt="" />
                                    </div>}
                                </button>
                            </div>
                            <div className="proyectDetailInfo">
                                <div className="containerTextProyect">
                                    {!MostrarComentario &&
                                        <>
                                            <h1 className="title">{name}</h1>
                                            <p className="descriptionParrafo">{description}</p>
                                        </>
                                    }
                                    {MostrarComentario && (
                                        <>
                                            <h2 className="titleComments" >{totalCommentaries} {Number(totalCommentaries) === 1 ? 'comentario' : 'comentarios'}</h2>
                                            <ul className="commentsStyle">
                                                {allCommentaries.map((comentario: any, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="titleComment">
                                                                {comentario.userId}
                                                            </div>
                                                            <li className="commentBox">{comentario.commentary}</li>
                                                        </div>
                                                    )
                                                })}
                                            </ul>
                                            <div className="flex w-full h-150 items-center justify-center gap-4" >
                                                <textarea className="messageTextSend" style={{ maxHeight: '10rem' }} value={newCommentary} onChange={handleChange}></textarea>
                                                <button className="flex min-w-8 justify-center align-middle" onClick={() => sendMessage()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#131142"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" /></svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {!MostrarComentario &&
                                    <div className="buttonsContainer">
                                        <p className="meta">{objective}</p>
                                        <Link href="/donaciones">
                                            <button className="buttonFull"> Donar Proyecto </button>
                                        </Link>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalProject;
