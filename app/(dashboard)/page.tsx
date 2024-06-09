import { TabContainer } from '@/components/dashboard/TabContainer';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function page() {
  return (
    <ScrollArea className="h-full">
      <TabContainer />
    </ScrollArea>
  );
}
