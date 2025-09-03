<template>
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-green-400 to-blue-500"
            name="Sarah Mwanza"
            username="sarahmw"
            time="30m"
            type="user"
            location="Woodlands, Lusaka"
        />

        <div class="mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
                alt="Delicious meal"
                class="h-64 w-full object-cover"
            />
        </div>

        <div class="space-y-3">
            <p class="leading-relaxed text-gray-800">
                Sunday dinner with the family! 🍽️ Nothing beats homemade ifisashi with kapenta and fresh vegetables from the garden 🌱
            </p>

            <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">#SundayDinner</span>
                <span class="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">#Homemade</span>
                <span class="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">#Family</span>
            </div>
        </div>

        <CardActions :likes="42" :comments="8" :shares="2" />
    </FeedCard>
</template>

<script setup>
import CardActions from '@/components/CardActions.vue';
import CardHeader from '@/components/CardHeader.vue';
import FeedCard from '@/components/FeedCard.vue';
</script>
