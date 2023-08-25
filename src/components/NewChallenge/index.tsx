import { useRef, useState, FormEvent } from 'react';

import { useChallengeContext } from '../../store/challenges-context';
import images from '../../assets/images';
import { IImage } from "../../types";
import Modal from '../Modal';

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
      <form className="newChallenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" className="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" className="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" className="deadline" />
        </p>

        <ul className="newChallengeImages">
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

        <p className="newChallengeActions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
