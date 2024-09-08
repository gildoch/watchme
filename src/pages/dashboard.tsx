import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2024-03-18T00:00:00:000Z",
      "2024-03-19T00:00:00:000Z",
      "2024-03-20T00:00:00:000Z",
      "2024-03-21T00:00:00:000Z",
      "2024-03-22T00:00:00:000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const series = [
  {
    data: [18, 28, 47, 57, 77],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" maxWidth={1480} mx="auto" px="6" pt="8">
        <SideBar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6","8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text>Inscritos da Semana</Text>
            <Chart type="area" height={160} series={series} options={options} />
          </Box>

          <Box p={["6","8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text>adadada</Text>
            <Chart type="area" height={160} series={series} options={options} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
