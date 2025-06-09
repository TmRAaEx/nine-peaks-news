/**Defines the params type used in api routes */
interface Params {
  params: Promise<Record<string, string>>;
}
export default Params;
