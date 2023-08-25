import { useContext, useRef, useState } from 'react';


import { FormEvent } from "react";

import { useChallengeContext } from '../store/challenges-context.js';
import Modal from './Modal.js';
import { IImage } from "../types";
import images from '../assets/images';

export default function NewChallenge({ onDone }: { onDone: () => void }) {
  const title = useRef<HTMLInputElement>(null);

  const description = useRef<HTMLTextAreaElement>(null);
  const deadline = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<null | IImage>(null);
  const { addChallenge } = useChallengeContext();

  function handleSelectImage(image: IImage) {
    setSelectedImage(image);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.current || !description.current || !deadline.current) return;

    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <ul id="new-challenge-images">
          {images.map((image) => (
            <li
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </li>
          ))}
        </ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
