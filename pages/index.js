import Layout from "../components/Layout";

export default function Home({ pokemons }) {
  const cardColor = (type) => {
    switch (type) {
      case "fire":
        return "bg-red-200";
      case "grass":
        return "bg-green-100";
      case "electric":
        return "bg-yellow-100";
      case "water":
        return "bg-blue-100";
      case "ground":
        return "bg-brown-100";
      case "rock":
        return "bg-gray-100";
      case "fairy":
        return "bg-pink-100";
      case "poison":
        return "bg-gray-700";
      case "bug":
        return "bg-orange-100";
      case "dragon":
        return "bg-red-600";
      case "psychic":
        return "bg-purple-100";
      case "flying":
        return "bg-indigo-100";
      case "fighting":
        return "bg-gray-300";
      case "normal":
        return "bg-white";
      default:
        console.log("Sorry no pokemon");
        break;
    }
  };

  return (
    <Layout title="Pokedex - NextJS">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/250px-International_Pok%C3%A9mon_logo.svg.png"
        alt="logo"
        className=" sm:w-64 sm:object-cover  xl:w-1/4 object-contain m-auto mb-12"
      />
      <div className="grid sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:ml-20 xl:grid-cols-3 xl:ml-0">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className={`max-w-sm rounded overflow-hidden shadow-lg ${cardColor(
              pokemon.pokemonType
            )} p-8`}
          >
            <img className="w-full" src={pokemon.pokeImg} alt={pokemon.name} />
            <div className="px-4 py-2">
              <div className="font-bold text-4xl mb-2 capitalize text-center">
                {pokemon.name}
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-6 py-2  text-lg font-semibold text-gray-700 mr-2 mb-2">
                {`# ${pokemon.pokemonType}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const pokeTypes = [];

  try {
    for (let i = 1; i <= 100; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const { types } = await res.json();
      const pokeType = types[0].type["name"];
      pokeTypes.push(pokeType);
    }

    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await res.json();
    const pokemons = data.results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const pokeImg = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      const pokemonType = pokeTypes[index];

      return {
        ...result,
        pokeImg,
        pokemonType,
      };
    });

    return {
      props: {
        pokemons,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
