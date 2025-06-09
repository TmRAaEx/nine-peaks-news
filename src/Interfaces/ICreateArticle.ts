import { IArticle } from "@/models/Article";

export default interface ICreateArticleData {
  title: IArticle["title"];
  description: IArticle["description"];
  header_img: IArticle["header_img"];
  content: IArticle["content"];
  sub_titles: IArticle["sub_titles"];
  sub_images: IArticle["sub_images"];
  sub_content: IArticle["sub_content"];
  required_tier: IArticle["required_tier"];
  authur: IArticle["authur"];
  date: IArticle["date"];
}