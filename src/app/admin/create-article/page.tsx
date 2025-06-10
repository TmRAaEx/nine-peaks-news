// "use client";
// import ICreateArticle from "@/interfaces/ICreateArticle";
// import { authClient } from "@/lib/ApiClient";
// import { ChangeEvent, FormEvent, useState } from "react";

// export default function CreateArticle() {
//     const [formData, setFormData] = useState<ICreateArticle>({
//     title: "",
//     description: "",
//     header_img: "",
//     images: [],
//     content: "",
//     sub_titles: [],
//     sub_content: [],
//     required_tier: "",
//     authur: "",
//     date:new Date()
//   });
//   const [error, setError] = useState<string | null>(null);
//  const [subContents, setSubContents] = useState<{ sub_title: string; sub_content: string }[]>([]);
//   const [images, setImages] = useState<string[]>([]);

//   const handleSubContentChange = (
//     index: number,
//     field: "sub_title" | "sub_content",
//     value: string
//   ) => {
//     const updated = [...subContents];
//     updated[index][field] = value;
//     setSubContents(updated);
  
//     // Always update formData with arrays of strings
//     setFormData((prev) => ({
//       ...prev,
//       sub_titles: updated.map((item) => item.sub_title),
//       sub_content: updated.map((item) => item.sub_content),
//     }));
//   };
//   const handleAddSubContent = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     const updated = [...subContents, { sub_title: "", sub_content: "" }];
//     setSubContents(updated);
//     setFormData((prev) => ({
//       ...prev,
//       sub_titles: updated.map((item) => item.sub_title),
//       sub_content: updated.map((item) => item.sub_content),
//     }));
//   };

//   const handleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (images.length < 3) {
//       const updated = [...images, ""];
//       setImages(updated);
//       setFormData((prev) => ({
//         ...prev,
//         images: updated,
//       }));
//     }
//   };

//   const handleImageChange = (index: number, value: string) => {
//     const updated = [...images];
//     updated[index] = value;
//     setImages(updated);
  
//     setFormData((prev) => ({
//       ...prev,
//       images: updated,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     console.log("Submitting:", formData);
//     const response = await authClient.post<any>("/create-article", formData);

//     if (response.error) {
//       setError(response.error);
//     }

//     console.log(response.data);
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { value, name } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
  
//   return (
//     <>
//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <p>{error}</p>

//         <label htmlFor="title">Title:</label>
//         <input type="text" 
//         name="title" 
//         className="title" 
//         value={formData.title}
//         onChange={handleChange}
//         />

//         <label htmlFor="description">Description:</label>
//         <textarea name="description" 
//         className="description" 
//         value={formData.description}
//         onChange={handleChange}
//         />

//         <label htmlFor="header_img">Header Image URL:</label>
//         <input type="text" 
//         name="header_img"
//         className="header_img" 
//         value={formData.header_img}
//         onChange={handleChange}
//         />

//         <label>Main Content:</label>
//         <textarea 
//         name="content" 
//         className="content" 
//         value={formData.content}
//         onChange={handleChange}
//         />

//         <hr />
//         <h3>Additional Images (max 3)</h3>
//         {images.map((img, index) => (
//           <div key={index}>
//             <label>Image {index + 1}:</label>
//             <input
//               type="text"
//               value={img}
//               onChange={(e) => handleImageChange(index, e.target.value)}
//             />
//           </div>
//         ))}
//         {images.length < 3 && (
//           <button onClick={handleAddImage}>Add Image</button>
//         )}

//         <hr />
//         <h3>Subcontents</h3>
//         {subContents.map((item, index) => (
//           <div key={index}>
//             <label>Sub title {index + 1}:</label>
//             <input
//               type="text"
//               value={item.sub_title}
//               onChange={(e) => handleSubContentChange(index, "sub_title", e.target.value)}
//               className="sub_title"
//             />
//             <label>Sub content {index + 1}:</label>
//             <textarea
//               value={item.sub_content}
//               onChange={(e) => handleSubContentChange(index, "sub_content", e.target.value)}
//               className="sub_content"
//             />
//           </div>
//         ))}  
//         <hr />
//         <button onClick={handleAddSubContent}>Add Subcontent</button>
//         <label htmlFor="required_tier">Required Tier</label>
//         <select
//         name="required_tier"
//         id="required_tier"
//         value={formData.required_tier}
//         onChange={handleChange}
//         className="required_tier"
//         >
//         <option value="">Select a tier</option>
//         <option value="Basecamp">Basecamp</option>
//         <option value="Summit Seeker">Summit Seeker</option>
//         <option value="Peak Elite">Peak Elite</option>
//         </select>

//         <label htmlFor="authur">Authur</label>
//         <input type="text" 
//         name="authur" 
//         className="authur"
//         value={formData.authur}
//         onChange={handleChange}
//         />
      
//         <button type="submit">Submit Article</button>
//       </form>
//     </>
//   );
// }

import { createArticle } from "@/actions/createArticle";
import { useFormStatus } from "react-dom";

export default function CreateArticle() {
    const [formData, setFormData] = useState<ICreateArticle>({
    title: "",
    description: "",
    header_img: "",
    content: "",
    sub_titles: [],
    sub_images: [],
    sub_content: [],
    required_tier: "",
    authur: "",
    date:new Date()
  });
  const [error, setError] = useState<string | null>(null);
 const [subContents, setSubContents] = useState<{ sub_title: string; sub_content: string }[]>([]);
  const [sub_images, setSub_Images] = useState<string[]>([]);

  const handleSubContentChange = (
    index: number,
    field: "sub_title" | "sub_content",
    value: string
  ) => {
    const updated = [...subContents];
    updated[index][field] = value;
    setSubContents(updated);
  
    // Always update formData with arrays of strings
    setFormData((prev) => ({
      ...prev,
      sub_titles: updated.map((item) => item.sub_title),
      sub_content: updated.map((item) => item.sub_content),
    })); 
  };
    const handleAddSubContent = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const updatedContents = [...subContents, { sub_title: "", sub_content: "" }];
      const updatedImages = [...sub_images, ""];
    
      setSubContents(updatedContents);
      setSub_Images(updatedImages);
      
      setFormData((prev) => ({
        ...prev,
        sub_titles: updatedContents.map((item) => item.sub_title),
        sub_content: updatedContents.map((item) => item.sub_content),
        sub_images: updatedImages,
      }));
    };
    const handleImageChange = (index: number, value: string) => {
      const updated = [...sub_images];
      updated[index] = value;
      setSub_Images(updated);
    
      setFormData((prev) => ({
        ...prev,
        sub_images: updated,
      }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    const response = await authClient.post<any>("/create-article", formData);

    if (response.error) {
      setError(response.error);
    }

    console.log(response.data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <form 
      className="flex flex-col items-center" 
      action={async (formData) => {
        await createArticle(formData);
      }} 
    >
      <FormFields />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit Article"}
    </button>
  );
}

function FormFields() {
  return (
    <>
      <label>Title:</label>
      <input type="text" name="title" required />

      <label>Description:</label>
      <textarea name="description" required />

      <label>Header Image URL:</label>
      <input type="text" name="header_img" />

        <label>Main Content:</label>
        <textarea 
        name="content" 
        className="content" 
        value={formData.content}
        onChange={handleChange}
        />
        <hr />
        <h3>Subcontents</h3>
        {subContents.map((item, index) => (
          <div key={index} className="mb-4 border p-2 rounded">
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
            <label>Image URL for Subcontent {index + 1} (optional):

            </label>
            <input
            type="text"
            value={sub_images[index] || "" }
              onChange={(e) => handleImageChange(index, e.target.value)}
              />
  </div>
))}

        <hr />
        <button onClick={handleAddSubContent}>Add Subcontent</button>
        <label htmlFor="required_tier">Required Tier</label>
        <select
        name="required_tier"
        id="required_tier"
        value={formData.required_tier}
        onChange={handleChange}
        className="required_tier"
        >
      <label>Main Content:</label>
      <textarea name="content" required />

      {[0, 1, 2].map((i) => (
        <input key={i} type="text" name="images" placeholder={`Image ${i + 1}`} />
      ))}

      {[0, 1, 2].map((i) => (
        <div key={i}>
          <input type="text" name="sub_titles" placeholder={`Subtitle ${i + 1}`} />
          <textarea name="sub_content" placeholder={`Subcontent ${i + 1}`} />
        </div>
      ))}

      <label>Required Tier:</label>
      <select name="required_tier" required>
        <option value="">Select a tier</option>
        <option value="Basecamp">Basecamp</option>
        <option value="Summit Seeker">Summit Seeker</option>
        <option value="Peak Elite">Peak Elite</option>
      </select>

      <label>Author:</label>
      <input type="text" name="authur" required />
    </>
  );
}

