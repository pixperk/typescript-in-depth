//Optional Parameters
function printingIngredient(
  qunatity: string,
  ingredient: string,
  caution?: string
) {
  //You cannot add mandatory parameters after optional
  console.log(`${qunatity} ${ingredient} ${caution ? `${caution}` : ""}`);
}

printingIngredient("1 TBSP", "Salt", "Don't put too much");

interface user {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: user): string {
  if (user.info) {
    return user.info!.email!; //non null indicator : !
  }
  return "";
}

function getEmailEasy(user: user): string {
  return user?.info?.email ?? "";
}

function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.(); //substitute for if(callback)callback()
}
