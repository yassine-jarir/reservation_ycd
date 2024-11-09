
import airImage from "../assets/airplane.png";

interface Item {
  time1: string,
  time2: string,
 }

function Recherche({times}: { times: Item }) {
   return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 flex " >
        <img height="50px" src="https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg" className="w-[80px]" alt=""/>
         </div>

        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          
          {times.time2}
        </p>
 
        <img
          className="w-8 h-8 rounded-full"
          src={airImage}
          alt="Bonnie image"
        />

        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          
          {times.time1}
        </div>
      </div>
    </li>
  );
}

export default Recherche;
