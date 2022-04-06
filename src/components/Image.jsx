export default function Post({ className, src }) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(className);
  return <img className={className} src={PF + src} alt="" />
}