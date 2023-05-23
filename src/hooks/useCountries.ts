import WC, { Country } from 'world-countries'

export const countries = WC.filter(
  (item: Country) => !['KP', 'AF', 'RU', 'UA'].includes(item.cca2)
)

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}))

const useCountries = () => {
  const getAll = () => formattedCountries

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value)
  }

  return {
    getAll,
    getByValue,
  }
}

export default useCountries
