import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Input, Button } from "@heroui/react";
import { EditIcon, EyeIcon, PlusIcon, SearchIcon } from '../../utils/icon';
import { onllineExamListColumns } from '../../utils/dummy-data';
import { usePathname, useRouter } from 'next/navigation';
import BreadcrumbsComponent from '../../layout-component/breadcrumbs';

const OnlineExamList = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Split the current path into segments and filter out empty strings
  const pathSegments = pathname.split('/').filter((segment) => segment);
  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{item?.id}</p>
          </div>
        );
      case "book":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{item?.book}</p>
          </div>
        );
      case "student_grade":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{item?.student_grade}</p>
          </div>
        );
      case "professor_role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{item?.professor_role}</p>
          </div>
        );

      // case "status":
      //   return (
      //     <Chip className="capitalize" color={statusColorMap[item.status]} size="sm" variant="flat">
      //       {cellValue !== "inactive" ? cellValue : "In Active"}
      //     </Chip>
      //   );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <EyeIcon />

              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
     <div className='book-list-section'>
        <BreadcrumbsComponent arr={pathSegments} />
        <div className="flex justify-between gap-3 items-end my-4">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search ..."
            startContent={<SearchIcon />}
            classNames={
              {
                label: "block text-sm font-medium text-[#68686F] dark:text-[#9F9FA5] group-data-[filled-within=true]:text-[#68686F] group-data-[filled-within=true]:dark:text-[#9F9FA5]",
                inputWrapper: "block bg-white dark:bg-transparent data-[hover=true]:bg-white dark:data-[hover=true]:bg-black group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-black shadow-none w-full px-4 py-2 h-10 border border-[#E7E7E9] dark:border-[#3E3E3E] data-[hover=true]:border-[#E7E7E9] data-[hover=true]:dark:border-[#3E3E3E] group-data-[focus=true]:border-[#E7E7E9] group-data-[focus=true]:dark:border-[#3E3E3E] rounded-xl focus:outline-none",
                input: "text-base font-medium text-[#343437] dark:text-white placeholder-[#9B9CA1]"
              }
            }
          />
          <div className="flex gap-3">
            <Button type="button" color="primary" className='bg-[linear-gradient(90deg,#7E41A2_0%,#9246B2_100%)]' endContent={<PlusIcon />} onPress={() => router.push('/super-admin/online-exam/add')}>
              Add New
            </Button>
          </div>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={onllineExamListColumns}>
            {(column) => (
              <TableColumn key={column.uid}
              className='font-semibold text-black'
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={[]}
            emptyContent={"No exams available"}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default OnlineExamList;
