<script setup lang="ts">
import axios from "axios";
import { onBeforeUnmount, onMounted, ref } from "vue";

const name = ref();
const sum = ref();
const tg = window.Telegram.WebApp;

onMounted(() => {
    tg.onEvent("invoiceClosed", handlePayment);
    tg.expand();
});

onBeforeUnmount(() => {
    tg.offEvent("invoiceClosed", handlePayment);
});

const handlePayment = async ({
                                 status,
                             }: {
    url: string;
    status: "paid" | "cancelled" | "failed" | "pending";
}) => {
    if (status === "paid") {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/notification`, {
                name: name.value,
                sum: sum.value,
            }, {
                headers: {
                    "ngrok-skip-browser-warning": 13,
                },
            });
        } catch (e) {
            tg.showAlert("Не удалось отправить донат");
        }
    }
};

async function makePayment() {
    if (!name.value) return;
    if (!sum.value) return;

    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/invoice`, {
            headers: {
                "ngrok-skip-browser-warning": 13,
            },
            params: {
                amount: sum.value,
            },
        });
        console.log(data);
        tg.openInvoice(data.link, () => {
        });
    } catch (e) {
        tg.showAlert("Не удалось провести оплату");
    }
}
</script>

<template>
    <div class="flex h-screen w-full flex-col gap-3 bg-primary-bg-color p-3">
        <input
            class="text-color h-20 w-full rounded-2xl bg-secondary-bg-color p-3 text-3xl outline-none"
            placeholder="Ник"
            v-model="name"
        />
        <div class="relative">
            <input
                type="number"
                class="text-color h-20 w-full rounded-2xl bg-secondary-bg-color p-3 text-3xl outline-none"
                placeholder="Сумма"
                min="0"
                v-model="sum"
            />
            <div
                class="absolute bottom-0 right-0 top-0 my-auto flex items-center rounded-r-2xl border-2 border-secondary-bg-color bg-primary-bg-color p-4 text-3xl"
            >
                ⭐
            </div>
        </div>
        <div
            class="mt-auto flex h-20 w-full cursor-pointer items-center justify-center rounded-2xl bg-button-color text-3xl text-button-text-color"
            @click="makePayment"
        >
            Оплатить
        </div>
    </div>
</template>
