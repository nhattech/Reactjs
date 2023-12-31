import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = (props) => {
  const [mealsFetch, setMealsFectch] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorHttp, setErrorHttp] = useState(null);

  useEffect(() => {
    fetch('https://react-http-e6eb6-default-rtdb.firebaseio.com/meals.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMealsFectch(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorHttp(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorHttp) {
    return (
      <section className={classes.error}>
        <p>{errorHttp}</p>
      </section>
    );
  }

  const mealsList = [];
  for (const key in mealsFetch) {
    mealsList.push({
      id: key,
      name: mealsFetch[key].name,
      description: mealsFetch[key].description,
      price: mealsFetch[key].price,
    });
  }
  const meals = mealsList.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
