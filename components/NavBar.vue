<template>
    <nav class="bg-gray-900 w-full fixed border-b flex justify-center h-16">
    <div class="self-center p-4 ">
        <ul class="flex p-4 md:p-0 mt-4 font-semibold rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
                <NuxtLink to="/products" 
                class="block py-2 px-3 text-white hover:text-orange-400" aria-current="page" 
                exact-active-class="text-orange-500"
                >Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/cart" 
                class="block py-2 px-3 text-white hover:text-orange-400" 
                exact-active-class="text-orange-500"
                >Carts</NuxtLink>
            </li>
        </ul>
    </div>
    </nav>
</template>