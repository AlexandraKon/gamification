// src/pages/Cards.js
import React, { useState, useEffect } from "react";
import { db } from "../services/firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Cards() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ keyword: "", author: "" });
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const colors = ["#FFDDC1", "#E1F7D5", "#C9E4FF", "#FFF9C4", "#FFECB3", "#D1C4E9", "#F8BBD0"];
  const cardsCollectionRef = collection(db, "cards");

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCards(data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, color: colors[index % colors.length] })));
    };

    fetchCards();
  }, []);

  const createCard = async () => {
    if (!newCard.keyword.trim()) {
      alert("Please enter a keyword for the card.");
      return;
    }

    await addDoc(cardsCollectionRef, { ...newCard });
    setNewCard({ keyword: "", author: "" });
    const data = await getDocs(cardsCollectionRef);
    setCards(data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, color: colors[index % colors.length] })));
  };

  const startEditCard = (card) => {
    setEditingCard(card);
    setNewCard({ keyword: card.keyword, author: card.author });
    setEditModalOpen(true);
  };

  const updateCard = async () => {
    if (editingCard) {
      const cardDoc = doc(db, "cards", editingCard.id);
      await updateDoc(cardDoc, { keyword: newCard.keyword, author: newCard.author });
    }
    setEditingCard(null);
    setNewCard({ keyword: "", author: "" });
    setEditModalOpen(false);
    const data = await getDocs(cardsCollectionRef);
    setCards(data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, color: colors[index % colors.length] })));
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setNewCard({ keyword: "", author: "" });
    setEditModalOpen(false);
  };

  const deleteCard = async (id) => {
    const cardDoc = doc(db, "cards", id);
    await deleteDoc(cardDoc);
    const data = await getDocs(cardsCollectionRef);
    setCards(data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, color: colors[index % colors.length] })));
  };

  return (
    <div>
      <div className="card_form">
        <input
          type="text"
          placeholder="Keyword"
          value={newCard.keyword}
          onChange={(e) => setNewCard({ ...newCard, keyword: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newCard.author}
          onChange={(e) => setNewCard({ ...newCard, author: e.target.value })}
        />
        <button onClick={createCard}>Create Card</button>
      </div>

      <div className="container_cards">
        {cards.map((card) => (
          <div key={card.id} className="card" style={{ backgroundColor: card.color }}>
            <p>{card.keyword}</p>
            <div className="cardAuthor">by {card.author}</div>
            <div className="cardActions">
              <FaEdit onClick={() => startEditCard(card)} />
              <FaTrashAlt onClick={() => deleteCard(card.id)} />
            </div>
          </div>
        ))}
      </div>

      {editModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Edit Post-it</h2>
            <input
              type="text"
              placeholder="Keyword"
              value={newCard.keyword}
              onChange={(e) => setNewCard({ ...newCard, keyword: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newCard.author}
              onChange={(e) => setNewCard({ ...newCard, author: e.target.value })}
            />
            <button onClick={updateCard}>Update Post-it</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
