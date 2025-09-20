export default function Card({children, flat=false, className=''}:{children:React.ReactNode; flat?:boolean; className?:string}){
    return <div className={`card ${flat?'card--flat':''} ${className}`}>{children}</div>;
  }
  