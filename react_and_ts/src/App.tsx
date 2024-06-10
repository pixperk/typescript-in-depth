import { useCallback } from "react";
import "./App.css";

interface ForChildren{
  children?:React.ReactNode
}

const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

const Box:React.FunctionComponent<ForChildren> = ({children})=>(
  <div style={{
    padding : "1rem",
    fontWeight : "bold"
  }}>
    {children}
  </div>
)

const List:React.FunctionComponent<{
  items : string[]
  onClick?: (item:string)=>void
}> = ({items, onClick})=>(
  <ul>
    {items.map((item,index)=>(
      <li key={index} onClick={()=>onClick?.(item)}>{item}</li>
    ))}
  </ul>
)


function App() {
  const onListClick = useCallback((item:string)=>{
    alert(item)
  },[])
  return (
    <>
      <Heading title="Introduction" />
      <Box>
        Hello There
      </Box>
      <List items={['React','Node','PostgreSQL']} onClick={onListClick}/>
    </>
  );
}

export default App;
