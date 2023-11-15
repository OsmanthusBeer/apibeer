<script lang="ts" setup>
defineProps<{ confirmUrl: string; username: string; teamname: string }>()
</script>

<template>
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2>Welcome to {{ teamname }}!</h2>
      <p>Dear {{ username }},</p>
      <p>We are excited to invite you to join our team! As a valued member, your skills in [Skill or Role] will be instrumental to our success.</p>
      <p>Your account is ready and waiting for you to begin your journey with us. To confirm your acceptance and create your team member profile, please click the button below.</p>
      <a :href="confirmUrl" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Join the Team</a>
      <div style="font-size: 0.8em; text-align: center; padding-top: 20px;">
        <p>
          OsmanthusBeer Labs<br>
        </p>
        <p>&copy; 2023 OsmanthusBeer Labs. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
