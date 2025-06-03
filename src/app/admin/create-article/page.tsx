"use client";
import ICreateArticle from "@/interfaces/ICreateArticle";
import { authClient } from "@/lib/ApiClient";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CreateArticle() {
    const [formData, setFormData] = useState<ICreateArticle>({
    title: "",
    description: "",
    header_img: "String",
    images: [],
    content: "String",
    sub_titles: [],
    sub_content: [],
    required_tier: "",
    authur: "",
  });
  const [error, setError] = useState<string | null>(null);
 const [subContents, setSubContents] = useState<{ sub_title: string; sub_content: string }[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const handleAddSubContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubContents([...subContents, { sub_title: "", sub_content: "" }]);
  };

  const handleSubContentChange = (
    index: number,
    field: "sub_title" | "sub_content",
    value: string
  ) => {
    const updated = [...subContents];
    updated[index][field] = value;
    setSubContents(updated);
  };

  const handleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (images.length < 3) {
      setImages([...images, ""]);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await authClient.post<any>("/create-article", formData);

    if (response.error) {
      setError(response.error);
    }

    console.log(response.data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <p>{error}</p>

        <label htmlFor="title">Title:</label>
        <input type="text" name="title" className="title" />

        <label htmlFor="description">Description:</label>
        <textarea name="description" className="description" />

        <label htmlFor="header_img">Header Image URL:</label>
        <input type="text" name="header_img" className="header_img" />

        <label>Main Content:</label>
        <textarea name="content" className="content" />

        <hr />
        <h3>Additional Images (max 3)</h3>
        {images.map((img, index) => (
          <div key={index}>
            <label>Image {index + 1}:</label>
            <input
              type="text"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
          </div>
        ))}
        {images.length < 3 && (
          <button onClick={handleAddImage}>Add Image</button>
        )}

        <hr />
        <h3>Subcontents</h3>
        {subContents.map((item, index) => (
          <div key={index}>
            <label>Sub title {index + 1}:</label>
            <input
              type="text"
              value={item.sub_title}
              onChange={(e) => handleSubContentChange(index, "sub_title", e.target.value)}
              className="sub_title"
            />
            <label>Sub content {index + 1}:</label>
            <textarea
              value={item.sub_content}
              onChange={(e) => handleSubContentChange(index, "sub_content", e.target.value)}
              className="sub_content"
            />
          </div>
        ))}  
        <hr />
        <button onClick={handleAddSubContent}>Add Subcontent</button>
        <label htmlFor="authur">Authur</label>
        <input type="text" name="authur" className="authur"/>
      
        <button type="submit">Submit Article</button>
      </form>
    </>
  );
}
