
import airImage from "../assets/airplane.png";
function Recherche({times}) {
   return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
        </div>

        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          a
        </p>
 
        <img
          className="w-8 h-8 rounded-full"
          src={airImage}
          alt="Bonnie image"
        />

        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          z
        </div>
      </div>
    </li>
  );
}

export default Recherche;
