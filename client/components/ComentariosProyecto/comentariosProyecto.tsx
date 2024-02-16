import React, { useState } from 'react';

interface ComentarioProyectoProps {
  onSubmit: (comment: string) => void;
}

const ComentarioProyecto: React.FC<ComentarioProyectoProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows={4}
        placeholder="Deja tu comentario... Si tu comentario es negativo, sera eliminado en el acto jeje"
        value={comment}
        onChange={handleCommentChange}
      />
      <button type="submit">Comentar</button>
    </form>
  );
};

export default ComentarioProyecto;