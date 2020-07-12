const email = 'krava@tut.by';
const password = 'kravA21!';
const tokenLife = 10800000;
let userId;
let token;
let tokenTime = 0;

const loginUser = async () => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    tokenTime = Date.now();
    userId = content.userId;
    token = content.token;
    return true;
  }
  if (rawResponse.status === 403) {
    throw Error('Incorrect password');
  }
  throw Error('User with such email is not registered');
};

const getStatistics = async () => {
  await loginUser();
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  const content = await rawResponse.json();
  return content;
};

const saveStaistics = async (statistics) => {
  const time = Date.now() - tokenTime;
  if (time > tokenLife) {
    await loginUser();
  }

  await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });
  return true;
};

export { getStatistics, saveStaistics };
