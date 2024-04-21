export function randInt(n: number) {
    return Math.floor(Math.random() * (n + 1));
}

export function showDialog(id: string) {
    const element = document.getElementById(id) as HTMLDialogElement;
    element.showModal();
}

export function hideDialog(id: string) {
    const element = document.getElementById(id) as HTMLDialogElement;
    element.close();
}
