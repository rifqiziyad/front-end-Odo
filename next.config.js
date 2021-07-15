module.exports = {
  env: {
    BASE_URL: "https://odo-wallet.herokuapp.com/backend4/api/v1",
  },
  async rewrites() {
    return [
      {
        source: "/login", //source = pengganti path
        destination: "/auth/login", // destination = awal path
      },
      {
        source: "/register", //source = pengganti path
        destination: "/auth/register", // destination = awal path
      },
      {
        source: "/transfer",
        destination: "/transfer/transfer",
      },
      {
        source: "/confirmation",
        destination: "/transfer/confirmation",
      },
    ];
  },
};
