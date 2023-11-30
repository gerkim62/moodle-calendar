export function getCalendarUrl(user: { domain: string; moodleUserId: string; authToken: string; }|null) {
    if (!user) {
        return null;
    }
    return  `https://${user.domain}/calendar/export_execute.php?userid=${user.moodleUserId}&authtoken=${user.authToken}&preset_what=all&preset_time=recentupcoming`;
}