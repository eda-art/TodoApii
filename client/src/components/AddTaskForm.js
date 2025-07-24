import React, { useState } from "react";
 
function AddTaskForm({ onAdd }) {
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!baslik.trim()) return;
 
    onAdd({
      baslik,
      aciklama,
      durum: false,
      olusturulmaTarihi: new Date().toISOString(),
    });
 
    setBaslik("");
    setAciklama("");
  };
 
  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Başlık"
        value={baslik}
        onChange={(e) => setBaslik(e.target.value)}
        className="input-field"
        required
        maxLength={50}
      />
      <textarea
        placeholder="Açıklama"
        value={aciklama}
        onChange={(e) => setAciklama(e.target.value)}
        className="textarea-field"
        rows={3}
        maxLength={150}
      />
      <button type="submit" className="add-btn">
        Görev Ekle
      </button>
    </form>
  );
}
 
export default AddTaskForm;