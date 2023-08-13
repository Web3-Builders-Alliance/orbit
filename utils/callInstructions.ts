import { web3 } from "@project-serum/anchor";

export const doFizzbuzz = (program, n, fizzbuzz,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .doFizzbuzz( n,)
          .accounts({
            fizzbuzz,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const init = (program, owner, fizzbuzz, rent, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .init()
          .accounts({
            owner,
            fizzbuzz,
            rent,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

