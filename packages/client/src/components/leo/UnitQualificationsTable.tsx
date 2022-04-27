import type { EmsFdDeputy, Officer, UnitQualification } from "@snailycad/types";
import { QualificationsHoverCard } from "components/admin/manage/units/QualificationHoverCard";
import { FullDate } from "components/shared/FullDate";
import { Table } from "components/shared/Table";
import { classNames } from "lib/classNames";
import { useTranslations } from "next-intl";

interface Props {
  unit: (EmsFdDeputy | Officer) & { qualifications: UnitQualification[] };
}

export function UnitQualificationsTable({ unit }: Props) {
  const common = useTranslations("Common");
  const t = useTranslations("Leo");

  return (
    <div className="mt-3">
      <h1 className="text-xl font-semibold">{t("unitQualifications")}</h1>

      {!unit.qualifications.length ? (
        <p className="my-2 text-gray-400">{t("noQualifications")}</p>
      ) : (
        <Table
          data={unit.qualifications.map((qa) => {
            return {
              image: <QualificationsHoverCard qualification={qa} />,
              name: (
                <p className="flex flex-col">
                  <span className={classNames(qa.suspendedAt && "text-gray-400 line-through")}>
                    {qa.qualification.value.value}
                  </span>
                  {qa.suspendedAt ? (
                    <span>
                      {t("suspendedOn")} <FullDate>{qa.suspendedAt}</FullDate>
                    </span>
                  ) : null}
                </p>
              ),
              assignedAt: <FullDate>{qa.createdAt}</FullDate>,
            };
          })}
          columns={[
            { Header: common("image"), accessor: "image" },
            { Header: common("name"), accessor: "name" },
            { Header: t("assignedAt"), accessor: "assignedAt" },
          ]}
        />
      )}
    </div>
  );
}