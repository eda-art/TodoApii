import React, { useState } from "react";
 
function EditTaskForm({ todo, onSave, onCancel }) {
  const [baslik, setBaslik] = useState(todo.baslik);
  const [aciklama, setAciklama] = useState(todo.aciklama);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...todo, baslik, aciklama });
  };
 
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={baslik}
        onChange={(e) => setBaslik(e.target.value)}
        placeholder="Başlık"
        required
      />
      <input
        type="text"
        value={aciklama}
        onChange={(e) => setAciklama(e.target.value)}
        placeholder="Açıklama"
        required
      />
      <button type="submit">Kaydet</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "5px" }}>
        Vazgeç
      </button>
    </form>
  );
}
 
export default EditTaskForm;
 
 
